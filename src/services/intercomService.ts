```typescript
import axios from 'axios';
import { IntercomConversation } from '../models/conversation';
import { retryHandler } from '../utils/retryHandler';
import { errorHandler } from '../utils/errorHandler';
import { config } from '../config';
import { saveConversation } from '../database/models/conversationModel';

export async function fetchIntercomConversations(): Promise<void> {
  try {
    const response = await retryHandler(() =>
      axios.get('https://api.intercom.io/conversations', {
        headers: {
          'Authorization': `Bearer ${config.intercomApiKey}`,
          'Accept': 'application/json'
        }
      })
    );

    const conversations: IntercomConversation[] = response.data.conversations;

    for (const conversation of conversations) {
      await saveConversation(conversation);
    }
  } catch (error) {
    errorHandler(error);
  }
}
```