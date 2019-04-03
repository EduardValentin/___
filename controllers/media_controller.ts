import { Response, Request, NextFunction } from 'express';
import MediaService from '../services/media_service';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { curry } from 'ramda';
import Database from '../models/index';
import { MediaFileAttributes } from '../models/MediaFile';
import { MediaGroupAttributes } from '../models/MediaGroup';

export default class MediaController {
  private MediaService: MediaService = null;
  private checkFileExtensionByMimeType: R.CurriedFunction2<string, string, boolean>;
  private COMPRESSED_PREFIX: string = 'compressed_200x200_';
  constructor() {
    this.MediaService = new MediaService();

    this.checkFileExtensionByMimeType = curry((mime: string, extension: string) => {
      return mime.indexOf(extension) !== -1;
    });
  }

  private optimizeImage = async (file: Express.Multer.File) => {
    const checkFile = this.checkFileExtensionByMimeType(file.mimetype);
    const outFile = `${__dirname}/../../uploads/media/${this.COMPRESSED_PREFIX}${file.originalname}`;
    if (checkFile('jpg') || checkFile('jpeg')) {
      return sharp(file.path)
        .resize(200,200)
        .jpeg({ quality: 40 })
        .toFile(outFile);
    } else if (checkFile('png')) {
      return sharp(file.path)
        .resize(200,200)
        .png({ quality: 40 })
        .toFile(outFile);
    } else if (checkFile('webp')) {
      return sharp(file.path)
        .resize(200,200)
        .webp({ quality: 40 })
        .toFile(outFile);
    } else {
      return sharp(file.path)
        .resize(200,200)
        .toFile(outFile);
    }

  }

  public addFile = async (req: Request, res: Response, next: NextFunction) => {
    const { body, file } = req;
    try {

      if (file.mimetype.indexOf('video') === -1) {
        await this.optimizeImage(file);
      }

      await this.MediaService.insertFile({
        name: file.originalname,
        group_id: body.group_id,
        type: file.mimetype,
      });

      res.status(204).send();
    } catch (error) {
      fs.unlink(file.path, err => err ? console.error(err.message) : null);
      res.status(500).send({ message: error.message});
    }
  };

  public addGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const group = await this.MediaService.insertGroup(body);
      res.status(200).send({ data: group });
    } catch (error) {
      res.status(500).send({ message: error.message});
    }
  };

  public removeFile = async (req: Request, res: Response, next: NextFunction) => {
    const file_id: number = req.params.id;
    try {
      const file = await this.MediaService.findFile({
        where: {
          id: file_id,
        }
      });

      if (!file) {
        res.status(404).send();
        return;
      }

      this.MediaService.deleteFile(file_id);

      fs.unlink(
        `${__dirname}/../../upload/media/${file.name}`,
        (err) => err ? console.error(err.message) : null
      );

      fs.unlink(
        `${__dirname}/../../upload/media/${this.COMPRESSED_PREFIX}${file.name}`,
        (err) => err ? console.error(err.message) : null
      );

      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message});
    }
  };

  public removeGroup = async (req: Request, res: Response, next: NextFunction) => {
    const group_id = req.params.id;
    const groupFiles = await this.MediaService.allFiles({
      where: {
        group_id,
      }
    });
    const promises = [];
    groupFiles.forEach(file => {
      promises.push(fs.unlink(
        `${__dirname}/../../uploads/media/${file.name}`,
        err => err ? console.error(err) : null
      ));

      if (file.type.indexOf('video') === -1) {
        promises.push(fs.unlink(
          `${__dirname}/../../uploads/media/${this.COMPRESSED_PREFIX}${file.name}`,
          err => err ? console.error(err) : null
        ));
      }

    });

    await Promise.all(promises);

    const deletedRows = await this.MediaService.deleteGroup(group_id);

    if(!deletedRows) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  };

  public allFiles = async (req: Request, res: Response, next: NextFunction) => {};

  public allFromGroup = async (req: Request, res: Response, next: NextFunction) => {
    const group_id = req.params.id;
    const data = await this.MediaService.allFiles({
      where: {
        group_id,
      },
    });
    res.status(200).send({ data });
  };

  public allGroups = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.MediaService.allGroups({
      include: [{
        attributes: ['id'],
        model: Database.MediaGroup,
        nested: true,
      }]
    });
    res.status(200).send({ data });
  };

  public showGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const group = await this.MediaService.findGroup({
      where: {
        id,
      },
      include: [Database.MediaFile],
    });

    const data = group.toJSON();

    const uploadsFolder = `${__dirname}/../../uploads/media`;
    data.MediaFiles.forEach((file) => {
      const prefix = file.type.indexOf('video') === -1 ? this.COMPRESSED_PREFIX : '';
      const buffer = fs.readFileSync(
        `${uploadsFolder}/${prefix}${file.name}`,
      );
      file.thumbnail = buffer.toString('base64');
    });

    res.status(200).send({ data });
  };

  public changeGroup = async (req: Request, res: Response, next: NextFunction) => {};

}
