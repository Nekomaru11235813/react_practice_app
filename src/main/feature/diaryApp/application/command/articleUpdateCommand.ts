export { ArticleUpdateCommand }
class ArticleUpdateCommand {
  constructor(
    public id: string,
    public title: string,
    public content: string
  ) {}
}
