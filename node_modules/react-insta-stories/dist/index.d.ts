import React from 'react';
import { ReactInstaStoriesProps, Story } from './interfaces';
declare const ReactInstaStories: {
    (props: ReactInstaStoriesProps): JSX.Element;
    defaultProps: {
        width: number;
        height: number;
        defaultInterval: number;
        preloadCount: number;
    };
};
export declare const WithHeader: React.FC<React.PropsWithChildren<{
    story: Story;
    globalHeader: Function;
}>>;
export declare const WithSeeMore: React.FC<React.PropsWithChildren<{
    story: Story;
    action: import("./interfaces").Action;
    customCollapsed?: React.ComponentType<{
        toggleMore: (show: boolean) => void;
        action: import("./interfaces").Action;
    }>;
}>>;
export default ReactInstaStories;
