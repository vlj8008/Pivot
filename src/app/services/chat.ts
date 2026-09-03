import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' 
})
export class ChatService {
  
  private http = inject(HttpClient);

  // return the Http observable. We hand the Chatbot the "Restaurant Buzzer", so the Chatbot can subscribe to it and wait for it to vibrate!
  askQuestion(question: string) {
    // We return the connection so the component can subscribe and wait for the answer
    return this.http.post('http://localhost:5052/api/v1/chat?userMessage=' + question, null, { responseType: 'text' });
  }
}