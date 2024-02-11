import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ModalContext, NecordArgumentsHost, SlashCommandContext } from 'necord';
const { EmbedBuilder } = require('discord.js');

type Constraints = { [key: string]: string }[];

export class BotError extends Error {
  constructor(validationError: ValidationError[]) {
    const error = JSON.stringify(validationError[0].constraints);
    super(error);
  }
}

@Catch(BotError)
export class BotInputExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const [interaction] = NecordArgumentsHost.create(host).getContext() as
      | SlashCommandContext
      | ModalContext;

    const constraints = Object.values(JSON.parse(exception.message));

    const embedErrors = new EmbedBuilder()
      .setColor('#FF0000') // Define a cor da barra lateral para vermelho
      .setTitle('There was an error with your input:')
      .setDescription(constraints.join('\n'));

    interaction.reply({ embeds: [embedErrors], ephemeral: true });

    return constraints;
  }
}
