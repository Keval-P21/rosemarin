type Signup = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type Login = { email: string; password: string };
type Section = { components: [] };
type Ingredient = { name: string; quantity: string; unit: string };
type Instruction = { display_text?: string; text?: string };
type Rendition = { url: string };
type Tag = {
  id: number;
  display_name: string;
  type: string;
  name: string;
};
type Recipe = {
  name: string;
  thumbnail_url: string;
  description: string;
  sections: Section[] | [];
  instructions: Instruction[];
  renditions: Rendition[];
  id?: number;
  id_tasty?: number | null;
  tags: Tag[] | [];
};
type MyRecipe = {
  title: string;
  img_url?: string;
  img_data?: string;
  img_alt_text?: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  id?: number;
  id_tasty?: number | null;
};
type Ids = {
  id: number;
  id_tasty: number | null;
};

type AuthType = {
  authenticated: boolean;
};
type Item = {
  name: string;
  unit: string;
  quantity: string;
  userId: number;
};

export {
  Signup,
  Login,
  Section,
  Ingredient,
  Instruction,
  Rendition,
  Recipe,
  MyRecipe,
  Ids,
  AuthType,
  Item,
  Tag,
};
