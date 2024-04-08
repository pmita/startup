// REACT
import { Header } from "@/components/ui/header";
import { titleVariants, Title } from "@/components/ui/title";
import { descriptionVariants, Description } from "@/components/ui/description";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BannerContent, BannerHeader, Banner, bannerVariants } from "@/components/ui/bannerz";
// UTILS
import { cn } from "@/utils/helpers";


export async function FeaturesBanner() {

  return (
    <Banner className={cn(bannerVariants({ variant: "center", size: "full", className: "flex-col bg-neutral rounded-[6px] relative p-10 overflow-hidden" }))}>
    <BannerHeader className="text-center max-w-[350px] sm:max-w-[600px] pt-12">
      <Header
          className="flex flex-col justify-center items-center gap-6"
          headerTitle={
            <Title 
              title="Features"
              className={cn(titleVariants({ 
                variant: "secondary", 
                size: "lg",
                className: "capitalize" 
              }))}
            />
          }
          headerDescription={
            <Description
              description="Learn the latest web development trends with feature based project. We cover everything from authentication, UI/UX, database configuration, and many more"
              className={cn(descriptionVariants({
                variant: "secondary",
                size: "default"
              }))}
            />
          }
        />
      </BannerHeader>
      <BannerContent className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              className="primary"
            >
              <path
                d="M22.428.013c-.103.01-.432.042-.727.066C14.883.693 8.497 4.37 4.453 10.024A23.755 23.755 0 0 0 .216 20.51C.023 21.828 0 22.217 0 24.005c0 1.787.023 2.177.216 3.495 1.304 9.012 7.718 16.584 16.417 19.39 1.558.501 3.2.844 5.068 1.05.727.08 3.87.08 4.598 0 3.224-.356 5.954-1.154 8.648-2.529.413-.21.492-.267.436-.314-.038-.028-1.797-2.388-3.909-5.24l-3.838-5.184-4.809-7.117c-2.646-3.913-4.824-7.112-4.842-7.112-.019-.005-.038 3.157-.047 7.018-.014 6.76-.019 7.033-.103 7.192-.122.23-.216.324-.413.427-.15.075-.282.09-.99.09h-.812l-.216-.137a.878.878 0 0 1-.314-.342l-.099-.212.01-9.406.014-9.41.145-.184c.075-.098.235-.225.347-.286.193-.094.268-.103 1.08-.103.957 0 1.116.038 1.365.31.07.075 2.674 3.997 5.79 8.721 3.115 4.724 7.376 11.175 9.469 14.342l3.8 5.756.193-.127c1.703-1.107 3.505-2.683 4.93-4.325a23.89 23.89 0 0 0 5.65-12.268c.193-1.318.216-1.708.216-3.495 0-1.788-.023-2.177-.216-3.495-1.304-9.013-7.718-16.584-16.417-19.39C29.832.623 28.199.28 26.37.074c-.451-.047-3.552-.099-3.942-.061Zm9.825 14.515a.946.946 0 0 1 .474.554c.038.122.047 2.73.038 8.608l-.014 8.436-1.488-2.28-1.492-2.28v-6.132c0-3.964.019-6.193.047-6.3a.957.957 0 0 1 .465-.592c.192-.098.262-.108 1-.108.694 0 .816.01.97.094Z"
              />
            </svg>
          </CardTitle>
          <CardDescription>Next.js</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
          App dir, Routing, Layouts, Loading UI and API routes.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              viewBox="0 0 3333 3333"
              width="50px"
              height="50px"
            >
              <circle
                cx={1667}
                cy={1667}
                r={1667}
              />
              <path
                d="m1671 1092 1-1c35-34 72-66 112-94 16-11 32-22 49-32 14-8 29-16 44-23 12-6 23-11 35-15 11-5 22-8 33-11 17-4 34-8 52-9h19c5 0 10 0 15 1 11 1 21 3 31 6 9 3 17 7 26 11 5 3 9 6 15 9 8 7 16 13 22 20 5 8 12 14 16 22 10 17 19 35 25 53 2 5 3 10 5 17 3 7 4 14 6 22 2 9 3 19 5 28l3 37c1 14 1 30 1 46 0 20-1 40-3 61-3 25-6 49-10 74-4 15-6 29-9 44l-6 26 13 4c26 7 50 16 76 25 19 8 39 16 58 26 17 8 34 17 50 26 18 11 35 22 51 34 14 11 27 22 40 34 10 10 18 19 27 30 6 8 12 18 18 27 7 14 12 28 17 43 2 8 3 18 3 27 0 6 0 12-1 18-1 10-3 21-6 30-3 10-7 18-11 27-10 18-21 35-35 51-4 5-9 9-13 13-6 7-11 12-18 17-7 7-16 14-24 19-11 9-21 16-32 23-14 9-29 18-44 25-19 10-37 19-56 28-19 8-38 15-58 23-17 6-34 12-51 17l-5 2c2 8 4 17 5 25 2 13 5 26 7 38 5 26 9 52 11 78 1 20 2 40 2 59 0 16-1 32-2 47-1 13-2 24-4 37-2 10-3 20-6 30l-6 23c-4 13-10 26-15 39-5 10-10 20-17 30-6 10-13 18-22 26-9 10-20 17-31 24-8 4-18 8-26 10-15 5-30 7-45 8-20 0-40-3-60-7-13-3-25-6-36-10-14-5-27-10-39-16-16-7-31-15-46-24-17-9-34-20-50-31-41-29-80-62-116-97l-9 7c-17 16-34 31-51 46-18 14-36 28-55 41-17 12-34 23-52 33-17 10-35 18-52 26-13 5-25 10-38 15-13 3-24 7-37 9-20 4-39 6-59 6-16 0-32-2-47-7-10-3-19-7-28-12-6-3-11-7-17-12-4-3-7-6-10-9-3-2-5-5-8-8-14-16-26-34-34-54l-4-9c-1-5-3-9-4-12-2-5-3-12-5-17-2-7-3-14-5-21-3-10-5-19-6-28-1-12-3-24-3-36-1-16-1-31-1-47 0-20 1-40 3-59 2-25 7-50 11-75l12-61-21-6c-25-8-50-17-74-27-17-6-33-13-50-22-15-7-29-15-44-24-19-11-37-22-54-35-14-11-28-22-42-35 5-23-5-33-13-44-8-9-15-19-21-30-5-9-9-19-13-30-1-4-2-9-3-14-3-10-4-20-5-30 0-6 1-13 1-19 1-4 2-9 3-14l3-11c7-22 18-43 33-62 2-2 4-5 6-7 2-4 5-7 8-10 4-5 8-9 13-13l18-16c8-7 16-13 24-19 10-8 22-15 33-23 13-8 28-16 43-24 18-9 37-18 57-26 35-15 71-27 107-38l9-2c-6-22-11-44-15-66-5-24-9-48-11-73-2-19-3-38-4-58-1-15 0-31 0-46 0-12 1-24 3-35 1-10 2-20 4-29 1-7 3-15 6-22 1-6 3-12 5-17l4-11c1-3 2-6 4-9 9-19 19-39 34-55 3-3 7-6 11-9 3-3 6-5 9-9l15-9c9-4 17-9 27-11 10-3 21-5 32-6 3 0 6-1 9-1h16l12 1c16 2 34 5 51 10 10 3 22 6 32 10 12 4 23 10 34 15 17 8 33 17 49 27 17 10 34 21 51 32 19 14 38 29 57 45 15 13 29 25 44 38l9 10 3-7zm425 869c-13 3-25 6-37 8-29 6-58 11-86 15-31 5-62 8-94 11-4 1-8 1-12 2-19 29-41 58-62 84-22 30-45 59-70 85l-10 12c31 30 64 59 100 84 15 11 30 21 45 30 13 9 26 15 40 22 12 6 23 11 36 15 10 4 19 7 30 9 8 2 17 4 25 4 8 1 15 1 22 1 10 0 22-2 31-6l9-4c6-4 11-9 16-14 6-8 11-16 17-25 2-2 3-5 5-8l5-13c2-5 4-11 6-17 2-7 4-14 5-21 2-10 3-19 5-29 2-9 2-20 3-31 1-23 1-46-1-69-1-23-4-46-7-68-3-18-7-37-11-55l-4-18-6-4zm-847 3-7 31c-7 35-12 71-16 107-2 24-2 48-2 71 1 10 1 20 2 31 1 10 4 18 5 28 1 6 3 13 4 20 2 5 3 10 5 16 2 4 3 8 5 13l6 9c1 2 2 4 4 6l3 6 3 4c7 8 13 16 23 21l6 3c5 3 10 5 15 6 7 1 14 2 21 2 8 0 15 0 21-1 9-2 17-4 26-5 10-2 20-5 29-8 12-5 23-9 34-14 16-7 31-15 45-23 16-10 31-20 47-31 16-12 32-23 47-36 10-8 18-15 28-24 7-7 16-13 23-21l3-3-18-20c-24-28-48-56-71-85-19-24-38-50-56-75h-6c-33-3-66-6-98-11-30-4-59-9-89-14l-35-8-7 5zm524 39c-31 1-64 2-97 2-31 0-62 0-93-2h-11l22 28c21 26 43 51 65 76 5 6 10 12 17 18l8-9c22-25 44-51 65-78 8-11 18-22 27-35h-3zm53-611c-32-3-66-4-100-5-16-1-32-1-49-1h-8c-15 0-30 0-46 1-35 0-70 2-105 4-20 30-39 59-58 90-22 35-42 71-61 107-12 22-23 46-35 69 13 25 26 51 39 75 21 37 42 73 63 109 18 28 36 57 54 83l64 3c30 1 60 1 91 1 52 0 104-2 155-5 18-26 35-54 52-81 37-61 72-124 102-188-10-22-21-44-33-65-14-29-30-56-46-83-22-38-46-76-71-113l-4-6-4 5zm-502 353c-8 19-16 39-23 58-12 30-23 61-32 91 18 5 37 8 55 11 26 5 54 9 81 12 7 1 14 2 22 2-12-18-24-36-34-55-24-39-46-79-67-119h-2zm696-3c-10 21-22 41-33 62-12 23-25 46-39 68-8 16-18 31-27 47l15-2c27-3 53-7 79-12 21-3 43-7 65-12-9-29-19-58-31-86-8-22-17-43-26-63l-3-2zm-820-297-24 7c-25 8-51 17-76 28-15 6-29 12-44 20-16 8-31 16-47 25-13 8-27 17-38 27-10 7-18 14-27 22-7 7-13 14-20 21-4 6-8 12-13 18-3 6-6 11-8 17-3 7-5 15-5 24v6c0 10 3 19 6 28l2 4 3 6 5 7 6 9 8 10c4 4 8 8 11 12l15 15 18 15c8 6 17 12 25 18 11 8 22 15 33 22 15 8 30 16 45 23 18 8 37 17 55 24 17 7 33 13 49 17l24 8 22-67c14-37 28-73 44-109l19-41-18-40c-16-36-31-74-45-111-7-20-15-41-21-63l-4-2zm944 1c-5 19-11 37-18 55-12 38-27 75-44 112l-20 45 25 55c16 35 30 70 42 105 8 18 14 37 20 55l12-4c15-4 29-8 43-14 28-9 56-21 82-35 17-7 33-17 48-26 14-7 27-17 39-27 10-6 18-13 27-22 7-6 15-15 21-22 5-5 10-12 14-18 3-5 6-11 8-16 5-7 7-16 7-25 1-3 1-5 0-8 0-5-1-11-3-17-3-7-6-13-10-20l-3-6-5-8c-3-3-6-6-8-9-3-3-6-8-10-12-5-4-10-8-14-13-7-5-13-10-20-16-8-6-16-11-24-17-10-7-21-13-32-20-14-7-29-14-44-21-17-8-35-15-53-22-24-10-50-17-75-24l-5-5zm-474 61c84 0 152 68 152 151 0 84-68 151-152 151-83 0-151-67-151-151s68-152 151-152v1zm248-105c19 29 37 58 54 88 16 28 31 56 47 85 9-22 17-43 25-65 10-27 19-54 28-81-18-5-36-8-55-12-34-6-67-11-101-16l2 1zm-495-1c-15 2-31 4-46 7-26 4-52 8-78 13-9 2-20 5-29 7 9 29 19 58 29 86 8 21 16 41 25 60 19-36 39-73 60-108 14-21 27-43 41-64l-2-1zm669-42 3-14c5-19 8-37 11-56 4-24 6-49 8-73s3-48 2-72c-2-11-2-22-4-32-1-10-3-19-4-28-2-8-3-15-5-21s-3-11-6-16l-3-13-4-8c-1-3-2-5-4-7-1-3-2-5-4-7-1-1-1-2-2-4-6-8-14-16-23-21-2-2-5-3-8-4-8-4-16-5-25-6h-8c-2 0-4 0-7 1-7 0-13 1-19 2-8 1-16 3-24 5l-28 9-33 15c-14 7-27 15-40 23-14 8-29 18-43 28-34 25-66 52-96 82l13 15c28 29 53 60 78 92 18 22 35 46 52 70l43 4c32 3 64 9 96 14 29 4 59 10 88 17l-4 5zm-471-215c-2-2-4-3-5-5-14-12-28-25-42-37-16-13-33-27-50-39-16-11-31-21-47-30-13-8-28-16-42-23-11-5-21-10-32-14-9-4-20-7-30-10-7-2-14-3-22-5-7-1-14-2-20-2h-15c-10 1-21 3-31 7-3 1-6 3-9 5-7 3-12 8-16 14-6 7-12 16-16 24l-4 9c-2 3-3 7-4 12-2 5-5 9-6 14-1 7-3 14-4 21-1 8-3 17-4 26-1 10-2 20-2 31-1 23 0 47 1 70 2 36 8 72 16 108 2 12 5 23 7 35 11-3 22-5 33-7 25-6 52-11 78-14 29-6 59-9 87-12l27-3c17-24 35-48 53-71 23-30 48-59 73-87l19-21 7 4zm50 51-17 20c-23 25-45 51-66 78l-18 23c14-1 27-1 40-2h109c17 1 35 1 52 2l-17-21c-22-29-46-57-70-84l-14-16h1z"
                style={{
                  fill: "#fff",
                }}
              />
            </svg>
          </CardTitle>
          <CardDescription>React</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
          Server/Client components, hooks, and more.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="50px"
              height="50px"
            >
              <path
                d="M8 37 23.234 8.436a.84.84 0 0 1 1.494.02L30 19 8 37z"
              />
              <path
                d="m8 36.992 5.546-34.199c.145-.895 1.347-1.089 1.767-.285L26 22.992l-18 14z"
              />
              <path d="m8.008 36.986.2-.157 17.529-14.341-4.944-9.476z" />
              <path
                d="m8 37 26.666-25.713a.954.954 0 0 1 1.606.547L40 37l-15 8.743a2.002 2.002 0 0 1-1.961 0L8 37z"
              />
            </svg>
          </CardTitle>
          <CardDescription>Firebase</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
          Firebase suit with AB testing, analytics, authentication, and db.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="50px"
              height="50px"
            >
              <path
                d="M24 9.604c-5.589 0-9.347 2.439-11.276 7.318-.2.505.417.92.816.551 2.035-1.882 4.322-2.505 6.86-1.871 1.826.456 3.131 1.781 4.576 3.247C27.328 21.236 30.051 24 36 24c5.589 0 9.348-2.44 11.276-7.319.2-.505-.417-.92-.816-.551-2.035 1.882-4.322 2.506-6.86 1.872-1.825-.456-3.13-1.781-4.575-3.247C32.672 12.367 29.948 9.604 24 9.604zM12 24C6.411 24 2.652 26.44.724 31.319c-.2.505.417.92.816.551 2.035-1.882 4.322-2.506 6.86-1.871 1.825.457 3.13 1.781 4.575 3.246 2.353 2.388 5.077 5.152 11.025 5.152 5.589 0 9.348-2.44 11.276-7.319.2-.505-.417-.92-.816-.551-2.035 1.882-4.322 2.506-6.86 1.871-1.826-.456-3.131-1.781-4.576-3.246C20.672 26.764 17.949 24 12 24z"
              />
            </svg>
          </CardTitle>
          <CardDescription>CSS</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            UI components built and styled with Tailwind CSS.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              width="50px"
              height="50px"
            >
              <path d="M3.783 2.826 12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976z" />
            </svg>
          </CardTitle>
          <CardDescription>Authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
          Authentication using NextAuth.js and middleware.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
        <CardHeader>
          <CardTitle>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 384 512"
              width="50px"
              height="50px"
            >
              <path d="M155.3 154.6c0-22.3 18.6-30.9 48.4-30.9 43.4 0 98.5 13.3 141.9 36.7V26.1C298.3 7.2 251.1 0 203.8 0 88.1 0 11 60.4 11 161.4c0 157.9 216.8 132.3 216.8 200.4 0 26.4-22.9 34.9-54.7 34.9-47.2 0-108.2-19.5-156.1-45.5v128.5a396.09 396.09 0 0 0 156 32.4c118.6 0 200.3-51 200.3-153.6 0-170.2-218-139.7-218-203.9z" />
            </svg>
          </CardTitle>
          <CardDescription>Subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
          Free and paid subscriptions using stripe.
          </p>
        </CardContent>
      </Card>
      </BannerContent>
    </Banner>
  )
}