import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto, UpdateRunDto } from './runs.dto';

@Controller('runs')
export class RunsController {
  constructor(private runsService: RunsService) {}

  @Get(':id/public')
  findPublic(@Param('id') id: string) {
    return this.runsService.findPublic(id);
  }

  @Get()
  findBySession(@Query('session_id') sessionId: string) {
    return this.runsService.findBySession(sessionId);
  }

  @Post()
  create(@Body() dto: CreateRunDto) {
    return this.runsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query('session_id') sessionId: string,
    @Body() dto: UpdateRunDto,
  ) {
    return this.runsService.update(id, sessionId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('session_id') sessionId: string) {
    return this.runsService.remove(id, sessionId);
  }
}
