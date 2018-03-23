import Model from './model';

const Author = Object.create(Model);

Author.api_url('/v1/authors');

export default Author;
