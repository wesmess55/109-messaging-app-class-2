import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private allPosts: Observable<Post[]>;
  
  postCollection:AngularFirestoreCollection<Post>;

  constructor(private fst:AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
   }

  private retrievePosts() {
    this.allPosts = this.postCollection.valueChanges();
  }
  
   public savePost(post){
    let item = Object.assign({},post);
  
    this.postCollection.add(item);
  }
  public getAllPosts() {
    this.retrievePosts();
    return this.allPosts;
  }
}
