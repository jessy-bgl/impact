import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export const useProfileScroll = () => {
  const [expandedId, setExpandedId] = useState<string | number>();

  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<{ [key: string]: View | null }>({});

  const resetExpandedSection = () => {
    setExpandedId(undefined);
  };

  const handleExpandProfileSection = (id: string | number) => {
    if (id !== expandedId) {
      setExpandedId(id);
      setTimeout(() => {
        // Ensure the section is scrolled into view after expansion
        scrollToSection(id);
      }, 10);
    } else {
      setExpandedId(expandedId ? undefined : id);
    }
  };

  const scrollToSection = (id: string | number) => {
    const sectionRef = sectionRefs.current[id];
    if (sectionRef && scrollViewRef.current) {
      sectionRef.measure((_, fy) =>
        scrollViewRef.current?.scrollTo({ y: fy, animated: true }),
      );
    }
  };

  return {
    scrollViewRef,
    sectionRefs,
    expandedId,
    handleExpandProfileSection,
    resetExpandedSection,
  };
};
