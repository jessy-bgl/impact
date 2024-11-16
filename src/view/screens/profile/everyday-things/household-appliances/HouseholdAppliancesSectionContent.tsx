import { ListContentContainer } from "@view/screens/profile/components/lists/ListContentContainer";
import { ListItemQuestion } from "@view/screens/profile/components/lists/ListItemQuestion";
import { useHouseholdAppliances } from "@view/screens/profile/everyday-things/household-appliances/useHouseholdAppliances";

export const HouseholdAppliancesSectionContent = () => {
  const { control, updateEverydayThingsProfile, househouldAppliances } =
    useHouseholdAppliances();

  return (
    <ListContentContainer>
      <ListItemQuestion
        question={househouldAppliances.householdAppliances}
        control={control}
        handleUpdate={updateEverydayThingsProfile}
      />
    </ListContentContainer>
  );
};
