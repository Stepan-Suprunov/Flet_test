import {MainPageLayout} from '../layouts/index.ts';
import {PostsList} from '../components/index.ts';

export function MainPage () {
    return (
        <MainPageLayout>
            <PostsList />
        </MainPageLayout>
    );
};