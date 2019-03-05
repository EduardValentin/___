import { Response, Request, NextFunction } from 'express';
import Database from '../models/index';
import * as BCrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const AUTH = req.headers.authorization;
  try {
    const decodedUser = jwt.verify(AUTH, process.env.JWT_SECRET);
    res.status(200).send({
      data: decodedUser,
    });
  } catch (error) {
    res.status(500).send({
      error,
    })
  }



};


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hash = await BCrypt.hash(req.body.password, 10);
    const user = await Database.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hash,
      email: req.body.email,
    })
    // Resource created
    console.log('Created user:', user);
    res.status(201).send({
      user,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  };
}
export const index = async (req: Request, res: Response, next: NextFunction) => {
  const users = await Database.User.findAll();
  res.status(200).send({
    data: users,
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username: reqUsername, password: reqPassword } = req.body;
  const user = await Database.User.findOne({
    where: {
      username: reqUsername,
    }
  });

  if (!user) {
    res.status(404).send({
      error: 'Username or password didn\'t match, please verify and try again',
    })
  }

  const passwordsMatch = await BCrypt.compare(reqPassword, user.password);

  if (!passwordsMatch) {
    res.status(404).send({
      error: 'Username or password didn\'t match, please verify and try again',
    })
  }
  const token = jwt.sign({
    user,
  }, process.env.JWT_SECRET);

  res.status(200).send({
    data: {
      user,
      token,
    }
  });
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  const deletedRowsCount = await Database.User.destroy({
    where: {
      user_id,
    }
  })
  if (!deletedRowsCount) {
    res.status(404).send({ error: 'User not found' });
  }
  res.status(204).send();

};
