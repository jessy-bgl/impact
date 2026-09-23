import { useContext } from "react";

import { createGuidedTourContext } from "@common/tour/GuidedTourContext";

export const ActionsTourContext = createGuidedTourContext();

export const useActionsTour = () => useContext(ActionsTourContext);
