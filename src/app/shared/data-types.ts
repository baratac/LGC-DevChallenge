//
// Post Structure as returned from the DB

export interface Post {

    id: number;
    title:string;
    author:string;
    publish_date: string;
    slug: string;
    description: string;
    content: string;
  } 

  //
  // Comment structgure as returned by the DB

  export interface Comment {
    id?: number;
    postId?: number;
    parent_id?: number | null;
    user: string;
    date: string;
    content: string;
  }

  //
  // Data fields of a Comment

  export interface CommentData {
      user: string;
      date: string;
      content: string;
  }

  //
  // Structure of comments, build internally to 
  // facilitate the rendering

  export interface CommentItemList {
    item: Comment;
    list?: CommentItemList[];
  }