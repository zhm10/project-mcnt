import React from "react";
import { Story } from "../../interfaces";
declare const withHeader: React.FC<React.PropsWithChildren<{
    story: Story;
    globalHeader: Function;
}>>;
export default withHeader;
