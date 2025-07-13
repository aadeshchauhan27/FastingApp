-- Create fasting_records table
CREATE TABLE IF NOT EXISTS fasting_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('16:8', '18:6', '20:4')),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  target_duration DECIMAL(4,2) NOT NULL,
  actual_duration DECIMAL(4,2),
  completed BOOLEAN DEFAULT FALSE,
  manually_added BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fasting_records_user_id ON fasting_records(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_records_start_time ON fasting_records(start_time);
CREATE INDEX IF NOT EXISTS idx_fasting_records_user_start_time ON fasting_records(user_id, start_time);

-- Enable Row Level Security (RLS)
ALTER TABLE fasting_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own fasting records" ON fasting_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fasting records" ON fasting_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fasting records" ON fasting_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own fasting records" ON fasting_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_fasting_records_updated_at
  BEFORE UPDATE ON fasting_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 