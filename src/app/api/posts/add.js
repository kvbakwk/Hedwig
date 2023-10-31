'use server'

import { validatePostContent } from "@app/utils/validator";

export default async function add(user_id, content) {
    
    const isValid = validatePostContent(content);

    return {
        add: isValid,
        contentErr: !validatePostContent(content)
    };
}