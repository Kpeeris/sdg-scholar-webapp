import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LstAccordionContent = [
  {
    id: 1,
    title: "Science and Technology",
    content:
      "Science and technology drive innovation, helping to address climate change, develop sustainable energy, protect ecosystems, and build resilient infrastructure through cutting-edge research and solutions.",
  },
  {
    id: 2,
    title: "Health and Medicine",
    content:
      "Health and medicine focus on improving global health, preventing disease, and ensuring access to clean water and sanitation, contributing to better well-being and addressing health inequalities.",
  },
  {
    id: 3,
    title: "Business and Economics",
    content:
      "Business and economics promote sustainable economic growth, decent work, and responsible consumption, while helping to reduce poverty and inequality through inclusive and ethical practices.",
  },
  {
    id: 4,
    title: "Law and Governance",
    content:
      "Law and governance create the legal frameworks and policies that support justice, equality, and peace, ensuring strong institutions and the enforcement of climate action and social protections.",
  },
  {
    id: 5,
    title: "Education",
    content:
      "Education provides knowledge and skills, promoting gender equality, reducing inequalities, and empowering individuals to take action on climate change and sustainable development.",
  },
  {
    id: 6,
    title: "Arts and Humanities",
    content:
      "The arts and humanities raise awareness about social issues, foster cultural understanding, and inspire action for justice, gender equality, and environmental sustainability through creative expression.",
  },
];

const RelaventSDGAccodian = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {LstAccordionContent.map((field) => (
        <AccordionItem key={field.id} value={field.id}>
          <AccordionTrigger>{field.title}</AccordionTrigger>
          <AccordionContent>{field.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default RelaventSDGAccodian;
