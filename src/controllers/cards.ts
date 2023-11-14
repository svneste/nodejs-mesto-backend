import { Request, Response } from 'express';
import Card from '../models/card';
import {
  STATUS_CREATED,
  BAD_REQUEST,
  ERROR_ID,
  ERROR_SERVER,
} from '../utils/constants';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => (res.send(cards)))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req: Request, res: Response) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  return Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_ID)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный _id карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_ID)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_ID)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};
