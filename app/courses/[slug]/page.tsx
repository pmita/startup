export const revalidate = 1200;

// UTILS
import { getCourseData } from "@/utils/admingFirebase";

interface Props {
  params: { slug: string };
}

export default async function CoursesPage(props: Props) { 
  // FETCH DATA
  const data = await getCourseData('courses', props.params.slug)
  return (
    <section>
    <h1>These are part of the courses page {props.params.slug}</h1>
    {data && (
      <h1>We got data from firestore</h1>
    )}
  </section>
  )
}

