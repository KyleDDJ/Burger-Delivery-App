import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    platform: "com.order.burgerordering",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '68a6c7980008bea3b0c4',
    bucketId: '68a80165002c09b3af71',
    userCollectionId: '68a6c7d9000725a9b148',
    categoriesCollectionId: '68a7e890000e5a289b43',
    customizationsCollectionId:'68a7eb01001b319bcca9',
    menuCollectionId: '68a7e968000a4d176fd1',
    menuCustomizationsCollectionId: '68a7fc4600191636df06',

}

export const client = new Client();

client
 .setEndpoint(appwriteConfig.endpoint)
 .setProject(appwriteConfig.projectId)
 .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (e) {
        throw new Error(e as string);
    }
};

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession( email, password );
    } catch (e) {
        throw new Error(e as string);

    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
        
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if(category) queries.push(Query.equal('categories', category));
    if(query) queries.push(Query.search('name', query));

    const menus = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        queries,
    )
    return menus.documents
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents
    } catch (e) {
        throw new Error(e as string);
    }
}