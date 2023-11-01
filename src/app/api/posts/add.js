'use server'

import { Pool } from "pg";

import { validatePostContent } from "@app/utils/validator";

export default async function add(user_id, content) {

    const isValid = validatePostContent(content);

    if(isValid){
        const client = new Pool();
        await client.query("INSERT INTO posts VALUES (DEFAULT, $1, $2, $3);", [user_id, content, new Date()])
    }

    return {
        add: isValid,
        contentErr: !validatePostContent(content)
    };
}