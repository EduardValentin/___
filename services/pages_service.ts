import BaseService from "./base_service";
import Database from '../models/index';

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
  public remove = async (id: number) => {
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
    return Database.Page.update({
      link: params.link,
      label: params.label,
    }, {
        where: {
          id: page_id,
        }
      });
  }
}