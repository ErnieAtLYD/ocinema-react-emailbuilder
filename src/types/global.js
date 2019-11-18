type NewsletterLayoutType = Array<NewsletterLayoutItemType>;

type NewsletterLayoutItemType = {
  id: number,
  layout: string,
  content: string,
  htmldescription: string,
  htmlquotes: string,
  posterurl: string
};

type WebsiteEventAPIType = {
  id: string,
  title: string
}

type StateType = {|
  layout: NewsletterLayoutType,
  panel: { visibility: boolean },
  panelIndex: number,
  panelItem: { [key: string]: any }
|}

type ActionsType = {|
  actions: { [key: string]: any }
|}

type AppType = {| ...StateType, ...ActionsType |};
