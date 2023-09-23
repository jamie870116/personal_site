import Giscus from '@giscus/react';

import { giscusConfigs } from '../GiscusConfigs';
import '../css/comments.css'

export default function Comments() {

    return (
        <div className='comments'>
            <Giscus
                repo={giscusConfigs.repo}
                repoId={giscusConfigs.repoId}
                category={giscusConfigs.category}
                categoryId={giscusConfigs.categoryId}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme='light_tritanopia'
                loading="lazy"
            />
        </div>
    )
}
