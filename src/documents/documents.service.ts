import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { User } from '../users/entities/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
async create(dto: CreateDocumentDto, user: User) {
try {
  const userEntity = await this.userRepo.findOne({ where: { id: user.id } });

if (!userEntity) {
  throw new NotFoundException(`User ${user.id} not found`);
}
const doc = this.repo.create({ ...dto, owner: userEntity});
const saved = await this.repo.save(doc);
console.log('Saved document:', saved);
return saved;
} catch (err) {
  console.error('Error saving document:', err);
  throw new InternalServerErrorException('Failed to save document');
}

}

  async findAll() {
    return this.repo.find({ relations: ['owner'] });
  }

  async findOne(id: number) {
    const doc = await this.repo.findOne({ where: { id }, relations: ['owner'] });
    if (!doc) throw new NotFoundException(`Document ${id} not found`);
    return doc;
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const updateFields: Partial<Document> = {};
    if (dto.title) updateFields.title = dto.title;
    if (dto.content) updateFields.content = dto.content;

    if (Object.keys(updateFields).length === 0) {
      throw new BadRequestException('No fields provided for update');
    }

    const result = await this.repo.update(id, updateFields);
    if (result.affected === 0) throw new NotFoundException(`Document ${id} not found`);

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Document ${id} not found`);
    return { message: `Document ${id} deleted` };
  }
}
