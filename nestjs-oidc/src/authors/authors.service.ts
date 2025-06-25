import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  findOneById(id: number): Author {
    return {
      id: id,
      firstName: 'foo',
      lastName: 'bar',
      posts: [],
    };
  }
}
