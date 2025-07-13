import { supabase, FastingRecord } from './supabase';

export interface LocalFastingRecord {
  id: string;
  type: string;
  startTime: Date;
  endTime?: Date;
  targetDuration: number;
  actualDuration?: number;
  completed: boolean;
  manuallyAdded?: boolean;
}

export class FastingService {
  // Convert between local and database formats
  static toLocalRecord(dbRecord: FastingRecord): LocalFastingRecord {
    return {
      id: dbRecord.id,
      type: dbRecord.type,
      startTime: new Date(dbRecord.start_time),
      endTime: dbRecord.end_time ? new Date(dbRecord.end_time) : undefined,
      targetDuration: dbRecord.target_duration,
      actualDuration: dbRecord.actual_duration,
      completed: dbRecord.completed,
      manuallyAdded: dbRecord.manually_added,
    };
  }

  static toDbRecord(localRecord: LocalFastingRecord, userId: string): Omit<FastingRecord, 'id' | 'created_at' | 'updated_at'> {
    return {
      user_id: userId,
      type: localRecord.type,
      start_time: localRecord.startTime.toISOString(),
      end_time: localRecord.endTime?.toISOString(),
      target_duration: localRecord.targetDuration,
      actual_duration: localRecord.actualDuration,
      completed: localRecord.completed,
      manually_added: localRecord.manuallyAdded,
    };
  }

  // Local storage methods (for backward compatibility)
  static getLocalFastingHistory(): LocalFastingRecord[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem('fastingHistory');
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((record: any) => ({
        ...record,
        startTime: new Date(record.startTime),
        endTime: record.endTime ? new Date(record.endTime) : undefined,
      }));
    } catch (error) {
      console.error('Error loading local fasting history:', error);
      return [];
    }
  }

  static saveLocalFastingHistory(history: LocalFastingRecord[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('fastingHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving local fasting history:', error);
    }
  }

  // Supabase methods
  static async getFastingHistory(userId: string): Promise<LocalFastingRecord[]> {
    try {
      const { data, error } = await supabase
        .from('fasting_records')
        .select('*')
        .eq('user_id', userId)
        .order('start_time', { ascending: false });

      if (error) throw error;

      return data.map(this.toLocalRecord);
    } catch (error) {
      console.error('Error fetching fasting history:', error);
      // Fallback to local storage
      return this.getLocalFastingHistory();
    }
  }

  static async saveFastingRecord(record: LocalFastingRecord, userId: string): Promise<void> {
    try {
      const dbRecord = this.toDbRecord(record, userId);
      
      const { error } = await supabase
        .from('fasting_records')
        .insert([dbRecord]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving fasting record:', error);
      // Fallback to local storage
      const history = this.getLocalFastingHistory();
      history.unshift(record);
      this.saveLocalFastingHistory(history);
    }
  }

  static async updateFastingRecord(record: LocalFastingRecord, userId: string): Promise<void> {
    try {
      const dbRecord = this.toDbRecord(record, userId);
      
      const { error } = await supabase
        .from('fasting_records')
        .update(dbRecord)
        .eq('id', record.id)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating fasting record:', error);
      // Fallback to local storage
      const history = this.getLocalFastingHistory();
      const index = history.findIndex(r => r.id === record.id);
      if (index !== -1) {
        history[index] = record;
        this.saveLocalFastingHistory(history);
      }
    }
  }

  static async deleteFastingRecord(recordId: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('fasting_records')
        .delete()
        .eq('id', recordId)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting fasting record:', error);
      // Fallback to local storage
      const history = this.getLocalFastingHistory();
      const filtered = history.filter(r => r.id !== recordId);
      this.saveLocalFastingHistory(filtered);
    }
  }

  // Migration method to sync local data to Supabase
  static async migrateLocalToSupabase(userId: string): Promise<void> {
    const localHistory = this.getLocalFastingHistory();
    
    for (const record of localHistory) {
      await this.saveFastingRecord(record, userId);
    }
    
    // Clear local storage after successful migration
    localStorage.removeItem('fastingHistory');
  }
} 