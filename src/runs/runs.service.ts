import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto, UpdateRunDto } from './runs.dto';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async findBySession(sessionId: string) {
    return this.prisma.run.findMany({
      where: { session_id: sessionId },
      orderBy: { created_at: 'desc' },
    });
  }

  async create(dto: CreateRunDto) {
    return this.prisma.run.create({
      data: {
        session_id: dto.session_id,
        mode: dto.mode,
        gender: dto.gender,
        player_deck: dto.player_deck,
        status: 'active',
      },
    });
  }

  async update(id: string, sessionId: string, dto: UpdateRunDto) {
    const run = await this.prisma.run.findUnique({ where: { id } });
    if (!run) throw new NotFoundException('Run não encontrada');
    if (run.session_id !== sessionId) throw new ForbiddenException();

    const data: any = { ...dto };
    if (dto.status === 'won' || dto.status === 'lost') {
      data.finished_at = new Date();
    }

    return this.prisma.run.update({ where: { id }, data });
  }

  async remove(id: string, sessionId: string) {
    const run = await this.prisma.run.findUnique({ where: { id } });
    if (!run) throw new NotFoundException('Run não encontrada');
    if (run.session_id !== sessionId) throw new ForbiddenException();

    return this.prisma.run.delete({ where: { id } });
  }

  async findPublic(id: string) {
    const run = await this.prisma.run.findUnique({ where: { id } });
    if (!run) throw new NotFoundException('Run não encontrada');

    return {
      id: run.id,
      mode: run.mode,
      gender: run.gender,
      status: run.status,
      current_floor: run.current_floor,
      player_deck: run.player_deck,
      badges_earned: run.badges_earned,
      achievements: run.achievements,
      finished_at: run.finished_at,
      created_at: run.created_at,
    };
  }
}
