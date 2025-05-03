import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class TestResult {
	@PrimaryGeneratedColumn()
    id!: number;

    @Index()
	@Column()
    userId!: string;

	@Column()
    url!: string;

	@Column({ type: 'text' })
    results!: string; // store JSON stringified result data

	@CreateDateColumn()
    createdAt!: Date;
}
