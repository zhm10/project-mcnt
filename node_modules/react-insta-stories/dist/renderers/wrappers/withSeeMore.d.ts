import React from "react";
import { Action, SeeMoreProps, Story } from "../../interfaces";
declare const withSeeMore: React.FC<React.PropsWithChildren<{
    story: Story;
    action: Action;
    customCollapsed?: SeeMoreProps["customCollapsed"];
}>>;
export default withSeeMore;
