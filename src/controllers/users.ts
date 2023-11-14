import { Request, Response } from 'express';
import User from '../models/user';
import {
  STATUS_CREATED,
  BAD_REQUEST,
  ERROR_ID,
  ERROR_SERVER,
} from '../utils/constants';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_ID)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный _id пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
};

export const patchInfo = (req: Request, res: Response) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_ID)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const patchAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_ID)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};
