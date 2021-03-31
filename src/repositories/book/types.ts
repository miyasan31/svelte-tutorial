// types.tsでは対応するモデルに関する型定義やRepositoryのインターフェースを提供します。
// Repository自体のインターフェースを公開することで環境によってモックRepositoryに置き換える際にも実装の詳細を抽象化することができます


//  Google Books APIのレスポンス
 export interface Result {
    items: BookItem[];
    kind: string;
    totalItems: number;
  }
  
// 本の情報
  export interface BookItem {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      publisher?: string;
      imageLinks?: {
        smallThumbnail: string;
        thumbnail: string;
      };
      pageCount: number;
      previewLink?: string;
    };
    saleInfo?: {
      listPrice: {
        amount: number;
      };
    };
  }
  
//  query parameters
  export interface Params {
    q: string;
    startIndex?: number;
  }
  
  export interface BookRepositoryInterface {
    get(params: Params): Promise<Result>;
    find(id: string): Promise<BookItem>;
  }