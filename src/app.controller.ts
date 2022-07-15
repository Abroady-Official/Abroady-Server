import { ConfigService } from "@nestjs/config";
import { Controller, Get } from "@nestjs/common";
import dayjs from "dayjs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Server")
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  // TODO Terminus를 이용해 health-check를 붙일 예정
  @Get()
  home(): string {
    const nowDate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    console.log(`API Home - ${nowDate}`);
    return "Abroady";
  }

  @Get("/health-check")
  healthCheck(): string {
    return "ok";
  }
}
