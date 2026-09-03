import { Component, Input, Output, EventEmitter, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../services/chat'; 
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})

export class Chatbot {
  @Input() userName: string = 'Guest';
  @Output() messageSent = new EventEmitter<void>();

  private chatService = inject(ChatService);
 

  isOpen = false; 
  userInput = '';
  chatHistory = signal<ChatMessage[]>([]);
  isLoading = signal(false);
 

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  askAI() {
    if (!this.userInput) return; 
    const questionToAsk = this.userInput;
    this.userInput = ''; 
    
    // 3. Push the User's question into the history array!
    this.chatHistory.update(history => [...history, { role: 'user', content: questionToAsk }]);
    this.isLoading.set(true);
    this.chatService.askQuestion(questionToAsk).subscribe({
      next: (answer) => {
        // 4. Push the AI's answer into the history array!
        this.chatHistory.update(history => [...history, { role: 'ai', content: answer }]);
        this.isLoading.set(false);
        this.messageSent.emit();
      },
      error: (err) => {
        this.chatHistory.update(history => [...history, { role: 'ai', content: 'Error: Server is down!' }]);
        this.isLoading.set(false);
      }
    });
  }
}