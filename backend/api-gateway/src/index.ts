import express from "express";

import session from "express-session";

import connectRedis from "connect-redis";

import Redis from "ioredis";

import { createConnection } from "typeorm";

import bodyParser from "body-parser";

import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import typeDefs from "./gql/typeDefs";

import resolvers from "./gql/resolvers";

import cors from "cors";

import dotenv from "dotenv";



dotenv.config();



const main = async () => {

  const app = express();

  console.log("client url", process.env.CLIENT_URL);

  app.use(

    cors({

      credentials: true,

      origin: process.env.CLIENT_URL,

    })

  );



  const router = express.Router();



  router.get("/", (req, res) => {

    res.send("<h1>MUMBLE PRICER API</h1>")

  })



  await createConnection();

  const redis = new Redis({

    port: Number(process.env.REDIS_PORT),

    host: process.env.REDIS_HOST,

    username: process.env.REDIS_USER,

    password: process.env.REDIS_PASSWORD,

  });

  const RedisStore = connectRedis(session);

  const redisStore = new RedisStore({

    client: redis,

  });





  app.use(bodyParser.json());

  app.use(

    session({

      store: redisStore,

      name: process.env.COOKIE_NAME,

      secret: process.env.SESSION_SECRET,

      resave: true,

      saveUninitialized: true,

      cookie: {

        sameSite: "None",

        httpOnly: true,

        secure: true,

        maxAge: Number(process.env.COOKIE_DURATION)

      },

    } as any)

  );



  app.set("trust proxy", 1);

  app.use(router);



  const schema = makeExecutableSchema({ typeDefs, resolvers });



  const apolloServer = new ApolloServer({

    schema,

    context: ({ req, res }: any) => ({ req, res }),

  });

  apolloServer.applyMiddleware({ app, cors: false });



  app.listen({ port: process.env.PORT || 5000 }, () => {

    console.log(

      `Server ready at ${process.env.API_HOST}${process.env.PORT || 5000}${apolloServer.graphqlPath}`

    );

  });

};



main();