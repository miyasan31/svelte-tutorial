// types.tsでは対応するモデルに関する型定義やRepositoryのインターフェースを提供します。
// Repository自体のインターフェースを公開することで環境によってモックRepositoryに置き換える際にも実装の詳細を抽象化することができます


//  Google Books APIのレスポンス
 export interface ResultType {
    items: BookItemType[]; // 本情報
    kind: string; // カテゴリ
    totalItems: number; // 検索ヒット数
  }
// 本の情報
  export interface BookItemType {
    id: string; // id
    volumeInfo: { // 本のいろんな情報（null有）
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
    saleInfo?: { // 値段？？？金額？？？
      listPrice: {
        amount: number;
      };
    };
  }
//  APIリクエストのクエリー
  export interface ParamsType { 
    q: string; // クエリーパラメータ 検索する文字
    startIndex?: number; //検索開始位置 index
  }

  
// BookRepository.tsで BookRepositoryInterface　=> BookRepository① に実装
  export interface BookRepositoryInterface {
    get(params: ParamsType): Promise<ResultType>;
    find(id: string): Promise<BookItemType>;
  }