import Student from "../../../../models/studentScheema.js"

const resolvers = {
  Query: {
    students: async (_, { lesson }) => {
      return await Student.find({ lesson });
    },
  },
};

export default resolvers;
