import BlogPage from "@/components/blog/blogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs"
}

const  Blogs = () => {
  return (
    <BlogPage />
  )
};

export default Blogs;