import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';

export const ApiCreatedEntityResponse = <T extends Type<unknown>>(DTO: T) =>
  applyDecorators(
    ApiExtraModels(SingleEntityResponseDto, DTO),
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SingleEntityResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(DTO),
              },
            },
          },
        ],
      },
    }),
  );
