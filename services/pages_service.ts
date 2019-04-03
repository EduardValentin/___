import BaseService from "./base_service";
import Database from '../models/index';
import sequelize = require("sequelize");
import { PageAttributes } from "../models/Page";
import { EntityAttributes } from "../models/Entity";

export default class PagesService extends BaseService {
  constructor() {
    super();
  }

  /** Adds a new page adding the association with entity in the join table */
  public addNew = async ({ label, link, entities }) => {
    const page = await Database.Page.create({
      label: label,
      link: link,
    });

    if (entities.length !== 0) {
      await page.addEntity(entities);
    }
    return page;
  }

  /** Removes the page from the db */
  public destroy = async (id: number) => {
    // Remove the association
    await Database.EntityPage.destroy({
      where: {
        page_id: id,
      }
    });

    return Database.Page.destroy({ where: { id } });
  }

  /** Unassociates an entity from a page */
  public removeEntity = async (page_id: number, entity_id: number) => {
    const page = await Database.Page.findById(page_id);
    return page.removeEntity(entity_id);
  }

  /** Associates an entity with a page */
  public addEntity = async (page_id: number, entity_id: number) => {
    const page = await Database.Page.findById(page_id);
    return page.addEntity(entity_id);
  }

  /** Edits the information about a page */
  public edit = async (page_id: number, params) => {
    const page = await Database.Page.find({
      where: {
        id: page_id
      },
      include: [{
        model: Database.Entity,
        attributes: ['id'],
      }],
    });

    page.link = params.link;
    page.label = params.label;
    if (params.entities) {

      const entitiesToAdd: number[] = [];
      const entitiesToRemove: number[] = [];

      page.Entities.forEach(entity => {
        if (!params.entities.find((reqEntityId: number) => reqEntityId === entity.id)) {
          // In request entity we didn't find the current entity associated with the page so we add it to remove list
          entitiesToRemove.push(entity.id);
        }
      });

      // Now we check if we have new entities

      params.entities.forEach((reqEntityId) => {
        if (!page.Entities.find(entity => entity.id === reqEntityId)) {
          // We didn't find the current page entity in the request so we add that to add list
          entitiesToAdd.push(reqEntityId);
        }
      });

      page.removeEntities(entitiesToRemove);
      page.addEntity(<any> entitiesToAdd);
    }
    page.save();
    return page;
  }

  public all = async (options?: sequelize.FindOptions<PageAttributes>) => {
    return Database.Page.all(options);
  }

}