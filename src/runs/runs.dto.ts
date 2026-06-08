import { IsString, IsIn, IsInt, IsArray, IsOptional, Min, Max } from 'class-validator';

export class CreateRunDto {
  @IsString()
  session_id: string;

  @IsIn(['normal', 'hard'])
  mode: string;

  @IsIn(['boy', 'girl'])
  gender: string;

  @IsArray()
  player_deck: any[];
}

export class UpdateRunDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(11)
  current_floor?: number;

  @IsOptional()
  @IsArray()
  player_deck?: any[];

  @IsOptional()
  @IsArray()
  badges_earned?: number[];

  @IsOptional()
  @IsInt()
  turns_played?: number;

  @IsOptional()
  @IsArray()
  achievements?: string[];

  @IsOptional()
  @IsIn(['active', 'won', 'lost'])
  status?: string;
}
