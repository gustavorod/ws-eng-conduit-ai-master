import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    return { tags: tags.map((tag) => tag.tag) };
  }

  async addUniqueTags(tags: string[]): Promise<void> {
    // Fetch all tags that match any of the input tags
    const existingTags = await this.tagRepository.find({ tag: { $in: tags } });

    // Extract the tag strings from the existing tag entities
    const existingTagStrings = existingTags.map((tag) => tag.tag);

    // Filter out the tags that already exist
    const uniqueTags = tags.filter((tagString) => !existingTagStrings.includes(tagString));

    // Map the unique tag strings to Tag entities and persist them
    const newTags = uniqueTags.map((tagString) => {
      const newTag = new Tag();
      newTag.tag = tagString;
      return newTag;
    });

    if (newTags.length) {
      await this.tagRepository.persistAndFlush(newTags);
    }
  }
}
