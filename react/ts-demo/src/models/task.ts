export default class Task {
  id: string;
  content: string;

  constructor(content: string) {
    this.id = Math.random().toString();
    this.content = content;
  }
}
