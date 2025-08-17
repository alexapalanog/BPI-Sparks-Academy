interface LearningStyleCardProps {
  style: {
    id: string;
    label: string;
    icon: any;
    description: string;
  };
}

export function LearningStyleCard({ style }: LearningStyleCardProps) {
  const IconComponent = style.icon;
  
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 text-[#28a745] flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm break-words leading-tight mb-2">{style.label}</h4>
          <p className="text-xs text-gray-600 leading-relaxed break-words">{style.description}</p>
        </div>
      </div>
    </div>
  );
}