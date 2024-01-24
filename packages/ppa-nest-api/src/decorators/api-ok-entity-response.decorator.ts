import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SingleEntityResponseDto } from 'src/util/single-entity-response.dto';

export const ApiOkEntityResponse = <T extends Type<unknown>>(DTO: T) =>
  applyDecorators(
    ApiExtraModels(SingleEntityResponseDto, DTO),
    ApiOkResponse({
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
