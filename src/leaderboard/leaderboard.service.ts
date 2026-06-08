import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getTop20() {
    const runs = await this.prisma.run.findMany({
      where: { status: 'won' },
      orderBy: [
        { current_floor: 'desc' },
        { turns_played: 'asc' },
        { finished_at: 'asc' },
      ],
      take: 20,
    });

    return runs.map((r) => ({
      id: r.id,
      mode: r.mode,
      gender: r.gender,
      current_floor: r.current_floor,
      turns_played: r.turns_played,
      achievements: r.achievements,
      finished_at: r.finished_at,
    }));
  }
}
