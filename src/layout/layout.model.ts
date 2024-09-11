import { model, Schema } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}
interface Category extends Document {
  title: string;
}
interface BannerImg extends Document {
  public_id: string;
  url: string;
}
interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  catgories: Category[];
  banner: {
    image: BannerImg;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<FaqItem>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});
const bannerImageSchema = new Schema<BannerImg>({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
});

const layoutSchem = new Schema<Layout>({
  type: {
    type: String,
  },
  faq: [faqSchema],
  catgories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

export const LayoutModel = model<Layout>("Layout", layoutSchem);
