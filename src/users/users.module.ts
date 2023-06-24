import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExamplMiddleware } from './middlewares/exampl/exampl.middleware';
import { AnotherMiddleware } from './middlewares/another/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

// configuring the middleware
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExamplMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      )
      .apply(AnotherMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      );
    // consumer.apply(ExamplMiddleware).forRoutes(UsersController);

    // you can also include the controller eg  consumer.apply(ExamplMiddleware).forRoutes(UsersController);
    // you can also be more specific example:  consumer.apply(ExamplMiddleware).forRoutes({ path: 'users',method:RequestMethod.GET},{PATH: 'users/:id',method: RequestMethod.GET}).apply();
  }
}
