
interface PreferencesSectionProps {
  preferences: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PreferencesSection = ({ preferences, onChange }: PreferencesSectionProps) => {
  return (
    <div>
      <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Travel Preferences
      </label>
      <textarea
        id="preferences"
        name="preferences"
        rows={3}
        placeholder="Tell us about your interests (e.g., adventure, culture, food, relaxation)"
        value={preferences}
        onChange={onChange}
        className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yatri-blue/50 focus:border-yatri-blue outline-none transition-all"
      />
    </div>
  );
};

export default PreferencesSection;
